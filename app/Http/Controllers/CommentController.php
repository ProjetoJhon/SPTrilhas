<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\Rule;

class CommentController extends Controller
{
    /**
     * List sanitized comments for a specific trail.
     */
    public function index(string $trailId): JsonResponse
    {
        // Validação básica do identificador da trilha (mitigação de path/query manipulation)
        if (!preg_match('/^[a-z0-9-]+$/', $trailId)) {
            return response()->json(['error' => 'Identificador de trilha inválido'], 400);
        }

        $comments = Comment::where('trail_id', $trailId)
            ->latest()
            ->take(50)
            ->get()
            ->map(function (Comment $comment) {
                return [
                    'id' => (string) $comment->id,
                    'trail_id' => $comment->trail_id,
                    'author' => e($comment->author_name), // Proteção contra XSS
                    'date' => $comment->created_at->diffForHumans(),
                    'status' => $comment->status,
                    'statusLabel' => match ($comment->status) {
                        'good' => 'Trilha Limpa & Excelente',
                        'muddy' => 'Atenção: Com Lama / Escorregadia',
                        'caution' => 'Atenção / Obstáculo no Percurso',
                        default => 'Informação Recente',
                    },
                    'comment' => e($comment->comment), // Sanitização XSS
                    'likes' => (int) $comment->likes,
                ];
            });

        return response()->json($comments);
    }

    /**
     * Store a sanitized, rate-limited, and CSRF-protected community report/comment.
     */
    public function store(Request $request): JsonResponse
    {
        // 1. Defesa em Profundidade contra Spam / DoS (Rate Limiting por IP)
        $clientIp = $request->ip() ?? 'unknown';
        $ipHash = hash('sha256', $clientIp . config('app.key'));
        $limiterKey = 'comment-submission:' . $ipHash;

        if (RateLimiter::tooManyAttempts($limiterKey, 5)) {
            $seconds = RateLimiter::availableIn($limiterKey);
            return response()->json([
                'error' => "Limite de envios atingido para sua segurança. Aguarde {$seconds} segundos antes de enviar novamente."
            ], 429);
        }

        // 2. Validação Rigorosa de Schema e Tipos
        $validated = $request->validate([
            'trail_id' => ['required', 'string', 'max:100', 'regex:/^[a-z0-9-]+$/'],
            'author_name' => ['nullable', 'string', 'max:50'],
            'status' => ['required', 'string', Rule::in(['good', 'muddy', 'caution'])],
            'comment' => ['required', 'string', 'min:3', 'max:1000'],
            // Campo honeypot anti-bot (se preenchido, é um bot de spam automatizado)
            'website_hp' => ['nullable', 'max:0'],
        ], [
            'comment.required' => 'O comentário não pode ficar em branco.',
            'comment.min' => 'O comentário deve conter no mínimo 3 caracteres.',
            'comment.max' => 'O comentário não pode exceder 1.000 caracteres.',
            'trail_id.regex' => 'Identificador de trilha inválido.',
        ]);

        // Se o honeypot capturou um bot silenciosamente rejeitamos
        if (!empty($request->input('website_hp'))) {
            return response()->json(['message' => 'Recebido'], 200);
        }

        // 3. Sanitização contra injeção de HTML / XSS / Script tags
        $cleanAuthor = trim(strip_tags($validated['author_name'] ?? 'Trilheiro Anônimo'));
        if (empty($cleanAuthor)) {
            $cleanAuthor = 'Trilheiro(a) Anônimo(a)';
        }

        $cleanComment = trim(strip_tags($validated['comment']));

        // Persistência segura
        $comment = Comment::create([
            'trail_id' => $validated['trail_id'],
            'user_id' => $request->user()?->id,
            'author_name' => $cleanAuthor,
            'status' => $validated['status'],
            'comment' => $cleanComment,
            'likes' => 0,
            'ip_hash' => $ipHash,
        ]);

        // Incrementa o contador de rate limit (permite até 5 envios a cada 10 minutos)
        RateLimiter::hit($limiterKey, 600);

        return response()->json([
            'id' => (string) $comment->id,
            'trail_id' => $comment->trail_id,
            'author' => e($comment->author_name),
            'date' => 'Agora mesmo',
            'status' => $comment->status,
            'statusLabel' => match ($comment->status) {
                'good' => 'Trilha Limpa & Excelente',
                'muddy' => 'Atenção: Com Lama / Escorregadia',
                'caution' => 'Atenção / Obstáculo no Percurso',
                default => 'Informação Recente',
            },
            'comment' => e($comment->comment),
            'likes' => 0,
        ], 201);
    }

    /**
     * Like a comment with rate-limiting to prevent voting manipulation.
     */
    public function like(Request $request, Comment $comment): JsonResponse
    {
        $ipHash = hash('sha256', ($request->ip() ?? 'unknown') . config('app.key'));
        $limiterKey = 'like-comment:' . $comment->id . ':' . $ipHash;

        if (RateLimiter::tooManyAttempts($limiterKey, 1)) {
            return response()->json([
                'error' => 'Você já curtiu este relato recentemente.'
            ], 429);
        }

        $comment->increment('likes');
        RateLimiter::hit($limiterKey, 86400); // 1 like por relato por IP a cada 24h

        return response()->json([
            'id' => (string) $comment->id,
            'likes' => $comment->likes,
        ]);
    }
}


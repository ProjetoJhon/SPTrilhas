<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeadersMiddleware
{
    /**
     * Handle an incoming request and enforce robust cybersecurity headers.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Prevenção contra clickjacking (evita que o site seja inserido em iframes maliciosos)
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');

        // Prevenção contra MIME-sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Proteção contra vazamento de referrers confidenciais
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Política de Permissões de APIs do Navegador (restringe microfone, câmera, pagamentos se não usados)
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), payment=()');

        // Forçar HTTPS e HSTS em conexões seguras
        if ($request->isSecure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }

        // Prevenção de caching de dados confidenciais quando autenticado
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        return $response;
    }
}


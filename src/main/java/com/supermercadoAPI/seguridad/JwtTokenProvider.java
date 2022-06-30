package com.supermercadoAPI.seguridad;


import java.util.Date;

import com.supermercadoAPI.excepciones.ApiAppException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration-milliseconds}")
    private int jwtExpirationInMs;

    public String generarToken(Authentication authentication) {
        String username = authentication.getName();
        Date fechaActual = new Date();
        Date fechaExpiracion = new Date(fechaActual.getTime() + jwtExpirationInMs);

        String token = Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(fechaExpiracion)
                .signWith(SignatureAlgorithm.HS512, jwtSecret).compact();

        return token;
    }

    public String obtenerUsernameDelJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public boolean validarToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        }catch (SignatureException ex) {
           // throw new ApiAppException(HttpStatus.BAD_REQUEST,"Firma JWT no valida");
            return false;
        }
        catch (MalformedJwtException ex) {
           // throw new ApiAppException(HttpStatus.BAD_REQUEST,"Token JWT no valida");
            return false;
        }
        catch (ExpiredJwtException ex) {
         //   throw new ApiAppException(HttpStatus.BAD_REQUEST,"Token JWT caducado");
            return false;
        }
        catch (UnsupportedJwtException ex) {
          //  throw new ApiAppException(HttpStatus.BAD_REQUEST,"Token JWT no compatible");
            return false;
        }
        catch (IllegalArgumentException ex) {
          //  throw new ApiAppException(HttpStatus.BAD_REQUEST,"La cadena claims JWT esta vacia");
            return false;
        }
    }
}
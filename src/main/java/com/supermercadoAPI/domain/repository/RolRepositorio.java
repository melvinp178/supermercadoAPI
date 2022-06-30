package com.supermercadoAPI.domain.repository;

import java.util.Optional;

import com.supermercadoAPI.persistence.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RolRepositorio extends JpaRepository<Rol, Long>{

    public Optional<Rol> findByNombre(String nombre);

}
package com.supermercadoAPI.domain.repository;

import com.supermercadoAPI.persistence.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}

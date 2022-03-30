package com.supermercadoAPI.web.controller;


import com.supermercadoAPI.domain.repository.ProductRepository;
import com.supermercadoAPI.persistence.entity.ProductEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/producto")
public class ProductController {
    private ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping( "/{id}")
    public ResponseEntity<ProductEntity> getUser(@PathVariable Long id){
        Optional<ProductEntity> foundUser = productRepository.findById(id);
        if (foundUser.isPresent()){
            return ResponseEntity.ok(foundUser.get());
        }
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error","Not found");
        errorResponse.put("message","User not found");
        errorResponse.put("status", HttpStatus.NOT_FOUND.toString());
        return new ResponseEntity(errorResponse,HttpStatus.NOT_FOUND);
    }
}

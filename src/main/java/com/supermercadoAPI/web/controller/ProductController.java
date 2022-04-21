package com.supermercadoAPI.web.controller;


import com.supermercadoAPI.domain.repository.ProductRepository;
import com.supermercadoAPI.persistence.entity.ProductEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/producto")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;


    @GetMapping( "/{id}")
    public ResponseEntity<ProductEntity> getProduct(@PathVariable Long id){
        Optional<ProductEntity> foundProduct = productRepository.findById(id);
        if (foundProduct.isPresent()){
            return ResponseEntity.ok(foundProduct.get());
        }
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error","Not found");
        errorResponse.put("message","Product not found");
        errorResponse.put("status", HttpStatus.NOT_FOUND.toString());
        return new ResponseEntity(errorResponse,HttpStatus.NOT_FOUND);
    }

    @PostMapping("/save")
    public ProductEntity saveProduct (@RequestBody ProductEntity productEntity){
        return productRepository.save(productEntity);
    }

    @GetMapping("/all")
    public List<ProductEntity> ListProduct(){
        return productRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable Long id){
        productRepository.deleteById(id);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity editProduct(@RequestBody ProductEntity product, @PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try {
            ProductEntity productEntity = productRepository.findById(id).get();
            productEntity.setNombre(product.getNombre());
            productEntity.setCodigoBarras(product.getCodigoBarras());
            productEntity.setCantidadStock(product.getCantidadStock());
            productEntity.setEstado(product.getEstado());
            productEntity.setPrecioVenta(product.getPrecioVenta());
            productRepository.save(productEntity);



            return new ResponseEntity(productEntity,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }


}

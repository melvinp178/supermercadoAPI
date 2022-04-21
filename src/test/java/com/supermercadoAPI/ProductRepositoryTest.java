package com.supermercadoAPI;


import com.supermercadoAPI.domain.repository.ProductRepository;
import com.supermercadoAPI.persistence.entity.ProductEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class ProductRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private ProductRepository productRepository;


    @Test
    public void testCreateProduct(){
        ProductEntity productEntity = new ProductEntity();
        productEntity.setNombre("arina");
        productEntity.setCantidadStock(5);
        productEntity.setCodigoBarras("1598753");
        productEntity.setEstado(true);
        productEntity.setPrecioVenta(500.0);

        Long productId =productEntity.getIdProducto();

        // descomentarizar metodo que desee probar

       // ProductEntity savedProduct = productRepository.save(productEntity);
       //  ProductEntity deleteProduct = productRepository.deleteById(productId);

       // ProductEntity existProduct = entityManager.find(ProductEntity.class, savedProduct.getIdProducto());

    }
}

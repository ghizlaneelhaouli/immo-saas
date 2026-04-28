package com.immosaas.repository;

import com.immosaas.domain.Product;
import com.immosaas.domain.enums.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByStatut(ProductStatus statut, Pageable pageable);
    List<Product> findByStatut(ProductStatus statut);
    List<Product> findByVendeurId(Long vendeurId);
}

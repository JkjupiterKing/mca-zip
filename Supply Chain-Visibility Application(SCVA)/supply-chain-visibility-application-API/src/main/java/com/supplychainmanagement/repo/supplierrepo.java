package com.supplychainmanagement.repo;

import com.supplychainmanagement.model.supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface supplierrepo extends JpaRepository<supplier, Long> {
}

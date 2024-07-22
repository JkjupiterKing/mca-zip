package com.supplychainmanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.supplychainmanagement.model.customerorders;

import java.util.Optional;

@Repository
public interface customerordersrepo extends JpaRepository<customerorders, Integer>{

    Optional<customerorders> findById(int orderId);

    void deleteById(int orderId);
}
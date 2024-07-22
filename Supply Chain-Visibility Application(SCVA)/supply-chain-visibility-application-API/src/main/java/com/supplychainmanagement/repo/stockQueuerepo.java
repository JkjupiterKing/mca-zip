package com.supplychainmanagement.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.supplychainmanagement.model.stockQueue;
@Repository
public interface stockQueuerepo extends JpaRepository<stockQueue, Long> {

}
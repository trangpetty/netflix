package com.example.netflix_clone.repository;

import com.example.netflix_clone.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BillRepository extends JpaRepository<Bill, Long> {
    @Query("SELECT u " +
            "FROM User u " +
            "WHERE (:email IS NULL OR u.email LIKE %:email%)")
    Page<Bill> getAllByEmailAndSubName(@Param("email") String email, Pageable pageable);
}

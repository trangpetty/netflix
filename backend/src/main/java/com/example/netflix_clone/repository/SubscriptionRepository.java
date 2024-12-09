package com.example.netflix_clone.repository;

import com.example.netflix_clone.entity.Subscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    @Query("SELECT s " +
            "FROM Subscription s " +
            "WHERE (:name IS NULL OR s.name LIKE %:name%)")
    Page<Subscription> getAllByName(@Param("name") String name, Pageable pageable);
}

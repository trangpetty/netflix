package com.example.netflix_clone.service;

import com.example.netflix_clone.entity.Bill;
import com.example.netflix_clone.entity.Subscription;
import com.example.netflix_clone.entity.UserSubscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SubscriptionService {
    Page<Subscription> getSubs(String email, Pageable pageable);

    Subscription updateSubscription(Long id, Subscription subscription);

    Subscription createSubscription(Subscription subscription);

    void deleteSubscription(Long id);

    UserSubscription createUserSubscription(UserSubscription userSubscription);

}

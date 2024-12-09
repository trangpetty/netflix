package com.example.netflix_clone.service.impl;

import com.example.netflix_clone.entity.Bill;
import com.example.netflix_clone.entity.Subscription;
import com.example.netflix_clone.entity.UserSubscription;
import com.example.netflix_clone.repository.BillRepository;
import com.example.netflix_clone.repository.SubscriptionRepository;
import com.example.netflix_clone.repository.UserSubscriptionRepository;
import com.example.netflix_clone.service.SubscriptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserSubscriptionRepository userSubscriptionRepository;
    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository, UserSubscriptionRepository userSubscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userSubscriptionRepository = userSubscriptionRepository;
    }

    @Override
    public Page<Subscription> getSubs(String name, Pageable pageable) {
        try {
            return subscriptionRepository.getAllByName(name, pageable);
        } catch (Exception e) {
            log.error("Error retrieving users: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to retrieve users", e);
        }
    }

    @Override
    public Subscription updateSubscription(Long id, Subscription updateSubscription) {
        Subscription sub = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription with id " + id + " not found"));
        sub.setName(updateSubscription.getName());
        sub.setPrice(updateSubscription.getPrice());
        sub.setResolution(updateSubscription.getResolution());
        sub.setMaxScreens(updateSubscription.getMaxScreens());
        sub.setMaxDownloadDevices(updateSubscription.getMaxDownloadDevices());

        return subscriptionRepository.save(sub);
    }

    @Override
    public Subscription createSubscription(Subscription subscription) {
        return subscriptionRepository.save(subscription);
    }

    @Override
    public void deleteSubscription(Long id) {
        Subscription sub = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription with id " + id + " not found"));
        subscriptionRepository.deleteById(id);
    }

    @Override
    public UserSubscription createUserSubscription(UserSubscription userSubscription) {
        return userSubscriptionRepository.save(userSubscription);
    }
}

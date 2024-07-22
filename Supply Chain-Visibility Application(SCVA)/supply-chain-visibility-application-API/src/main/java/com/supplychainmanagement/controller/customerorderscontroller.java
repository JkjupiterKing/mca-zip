package com.supplychainmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supplychainmanagement.model.customerorders;
import com.supplychainmanagement.repo.customerordersrepo;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class customerorderscontroller {

    @Autowired
    private customerordersrepo customerOrdersRepo;

    @GetMapping("/getAllCustomerOrders")
    public ResponseEntity<List<customerorders>> getAllCustomerOrders() {
        try {
            List<customerorders> customerOrdersList = customerOrdersRepo.findAll();

            if (customerOrdersList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(customerOrdersList, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getCustomerOrderById/{id}")
    public ResponseEntity<customerorders> getCustomerOrderById(@PathVariable int id) {
        Optional<customerorders> customerOrderData = customerOrdersRepo.findById(id);

        return customerOrderData.map(customerOrder ->
                        new ResponseEntity<>(customerOrder, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/addCustomerOrder")
    public ResponseEntity<customerorders> addCustomerOrder(@RequestBody customerorders customerOrder) {
        try {
            customerorders savedCustomerOrder = customerOrdersRepo.save(customerOrder);
            return new ResponseEntity<>(savedCustomerOrder, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateCustomerOrderById/{id}")
    public ResponseEntity<customerorders> updateCustomerOrderById(@PathVariable Integer id, @RequestBody customerorders customerOrder) {
        Optional<customerorders> oldCustomerOrderData = customerOrdersRepo.findById(id);

        if (oldCustomerOrderData.isPresent()) {
            customerorders updatedCustomerOrder = oldCustomerOrderData.get();
            updatedCustomerOrder.setCustomerName(customerOrder.getCustomerName());
            updatedCustomerOrder.setProductName(customerOrder.getProductName());
            updatedCustomerOrder.setStatus(customerOrder.getStatus());

            customerorders savedCustomerOrder = customerOrdersRepo.save(updatedCustomerOrder);
            return new ResponseEntity<>(savedCustomerOrder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteCustomerOrderById/{id}")
    public ResponseEntity<HttpStatus> deleteCustomerOrderById(@PathVariable Integer id) {
        try {
            customerOrdersRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

package com.supplychainmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supplychainmanagement.model.supplier;
import com.supplychainmanagement.repo.supplierrepo;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class suppliercontroller {

    @Autowired
    private supplierrepo supplierRepository;

    @GetMapping("/getAllSuppliers")
    public ResponseEntity<List<supplier>> getAllSuppliers() {
        try {
            List<supplier> supplierList = supplierRepository.findAll();

            if (supplierList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(supplierList, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getSupplierById/{id}")
    public ResponseEntity<supplier> getSupplierById(@PathVariable Long id) {
        Optional<supplier> supplierData = supplierRepository.findById(id);

        return supplierData.map(supplier ->
                        new ResponseEntity<>(supplier, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/addSupplier")
    public ResponseEntity<supplier> addSupplier(@RequestBody supplier supplier) {
        try {
            supplier savedSupplier = supplierRepository.save(supplier);
            return new ResponseEntity<>(savedSupplier, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateSupplierById/{id}")
    public ResponseEntity<supplier> updateSupplierById(@PathVariable Long id, @RequestBody supplier updatedSupplier) {
        Optional<supplier> oldSupplierData = supplierRepository.findById(id);

        if (oldSupplierData.isPresent()) {
            supplier existingSupplier = oldSupplierData.get();
            existingSupplier.setName(updatedSupplier.getName());
            existingSupplier.setContactPerson(updatedSupplier.getContactPerson());
            existingSupplier.setEmail(updatedSupplier.getEmail());
            existingSupplier.setPhone(updatedSupplier.getPhone());
            existingSupplier.setAddress(updatedSupplier.getAddress());

            supplier savedSupplier = supplierRepository.save(existingSupplier);
            return new ResponseEntity<>(savedSupplier, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteSupplierById/{id}")
    public ResponseEntity<HttpStatus> deleteSupplierById(@PathVariable Long id) {
        try {
            supplierRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

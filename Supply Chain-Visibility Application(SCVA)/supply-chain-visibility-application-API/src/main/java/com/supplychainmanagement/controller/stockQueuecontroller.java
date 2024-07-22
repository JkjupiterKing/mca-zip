package com.supplychainmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supplychainmanagement.model.stockQueue;
import com.supplychainmanagement.repo.stockQueuerepo;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class stockQueuecontroller {

    @Autowired
    private stockQueuerepo stockRepository; // Adjust repository type as per your actual repository

    @GetMapping("/getAllStocks")
    public ResponseEntity<List<stockQueue>> getAllStock() {
        try {
            List<stockQueue> stockList = stockRepository.findAll();

            if (stockList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(stockList, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getStockById/{id}")
    public ResponseEntity<stockQueue> getStockById(@PathVariable Long id) {
        Optional<stockQueue> stockData = stockRepository.findById(id);

        return stockData.map(stock ->
                        new ResponseEntity<>(stock, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/addStock")
    public ResponseEntity<stockQueue> addStock(@RequestBody stockQueue stock) {
        try {
            stockQueue savedStock = stockRepository.save(stock);
            return new ResponseEntity<>(savedStock, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateStockById/{id}")
    public ResponseEntity<stockQueue> updateStockById(@PathVariable Long id, @RequestBody stockQueue stock) {
        Optional<stockQueue> oldStockData = stockRepository.findById(id);

        if (oldStockData.isPresent()) {
            stockQueue updatedStock = oldStockData.get();
            updatedStock.setStockName(stock.getStockName());
            updatedStock.setDescription(stock.getDescription());
            updatedStock.setPrice(stock.getPrice());
            updatedStock.setStockQuantity(stock.getStockQuantity());

            stockQueue savedStock = stockRepository.save(updatedStock);
            return new ResponseEntity<>(savedStock, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteStockById/{id}")
    public ResponseEntity<HttpStatus> deleteStockById(@PathVariable Long id) {
        try {
            stockRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

package com.supplychainmanagement.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="customerorders")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class customerorders {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
        private int orderId;

        private String customerName;

        private String productName;

        private String status;

}


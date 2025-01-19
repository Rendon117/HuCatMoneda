package com.mx.HuCatMoneda.Dominio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "HU_CAT_MONEDA")
@Data
public class HuCatMoneda {
 
	
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "NUM_CIA", nullable = false, length = 4)
	    private int numCia;

	    @Column(name = "CLAVE_MONEDA", nullable = false, length = 3)
	    private String claveMoneda;

	    @Column(name = "DESCRIPCION", length = 30)
	    private String descripcion;

	    @Column(name = "SIMBOLO", length = 5)
	    private String simbolo;

	    @Column(name = "ABREVIACION", length = 5)
	    private String abreviacion;

	    @Column(name = "MONEDA_CORRIENTE", length = 1)
	    private String monedaCorriente;

	    @Column(name = "STATUS", length = 1)
	    private String status;

}

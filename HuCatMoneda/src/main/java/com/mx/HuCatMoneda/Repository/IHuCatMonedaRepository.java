package com.mx.HuCatMoneda.Repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mx.HuCatMoneda.Dominio.HuCatMoneda;

@Repository
public interface IHuCatMonedaRepository extends JpaRepository<HuCatMoneda, Integer>{
	  List<HuCatMoneda> findByClaveMonedaContainingAndDescripcionContainingAndSimboloContainingAndAbreviacionContainingAndMonedaCorrienteContainingAndStatusContaining(
	            String claveMoneda,
	            String descripcion,
	            String simbolo,
	            String abreviacion,
	            String monedaCorriente,
	            String status
	    );

}

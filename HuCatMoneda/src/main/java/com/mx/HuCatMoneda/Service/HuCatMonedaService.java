package com.mx.HuCatMoneda.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mx.HuCatMoneda.Dominio.HuCatMoneda;
import com.mx.HuCatMoneda.Repository.IHuCatMonedaRepository;

@Service
public class HuCatMonedaService {

	 @Autowired
	    private IHuCatMonedaRepository repository;


	    public List<HuCatMoneda> obtenerTodas() {
	        return repository.findAll();
	    }

	    public Optional<HuCatMoneda> obtenerPorId(int numCia) {
	        return repository.findById(numCia);
	    }

	    public HuCatMoneda guardarMoneda(HuCatMoneda moneda) {
	        return repository.save(moneda);
	    }

	    public void eliminarMoneda(int numCia) {
	    	repository.deleteById(numCia);
	    }

	    public List<HuCatMoneda> buscarPorParametros(String claveMoneda, String descripcion, String simbolo, String abreviacion, String monedaCorriente, String status) {
	        return repository.findByClaveMonedaContainingAndDescripcionContainingAndSimboloContainingAndAbreviacionContainingAndMonedaCorrienteContainingAndStatusContaining(
	                claveMoneda != null ? claveMoneda : "",
	                descripcion != null ? descripcion : "",
	                simbolo != null ? simbolo : "",
	                abreviacion != null ? abreviacion : "",
	                monedaCorriente != null ? monedaCorriente : "",
	                status != null ? status : ""
	        );
	    }
}

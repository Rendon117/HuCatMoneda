package com.mx.HuCatMoneda.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mx.HuCatMoneda.Dominio.HuCatMoneda;
import com.mx.HuCatMoneda.Service.HuCatMonedaService;

import io.swagger.v3.oas.annotations.Operation;



@RestController
@RequestMapping(path = "/api/monedas")//http://localhost:8081/api/monedas
@CrossOrigin
public class HutCatMonedaWS {
	@Autowired
    private HuCatMonedaService service;

    @GetMapping(path ="/listar")
    @Operation(summary = "Muestra todas las monedas", description = "Devuelve informacion de todas las monedas")
    public List<HuCatMoneda> obtenerTodos() {
        return service.obtenerTodas();
    }

    @GetMapping("/{numCia}")
    @Operation(summary = "buscar por id(numCia)", description = "Devuelve la informacion del id(numCia) a buscar")
    public ResponseEntity<HuCatMoneda> obtenerPorId(@PathVariable int numCia) {
        return service.obtenerPorId(numCia)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(path="/guardar")
    @Operation(summary = "Crea un nuevo registro", description = "guardar la informacion de la moneda")
    public ResponseEntity<HuCatMoneda> crear(@RequestBody HuCatMoneda moneda) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.guardarMoneda(moneda));
    }

    @PutMapping("/{numCia}")
    @Operation(summary = "edita la informacion de la moneda seleccionado", description = "actualiza la informacion ")
    public ResponseEntity<HuCatMoneda> actualizar( @RequestBody HuCatMoneda moneda) {
    	 // Validar si el ID existe en la base de datos
        if (!service.obtenerPorId(moneda.getNumCia()).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        // Guardar la moneda actualizada y devolver la respuesta
        return ResponseEntity.ok(service.guardarMoneda(moneda));
    }

    @DeleteMapping("/{numCia}")
    @Operation(summary = "eliminina un registro por medio del id(numCia) seleccionado", description = "elimina el registro seleccionado")
    public ResponseEntity<Void> eliminar(@PathVariable int numCia) {
        if (!service.obtenerPorId(numCia).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.eliminarMoneda(numCia);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/buscar")
    @Operation(summary = "busca moneda por algun parametro", description = "muestra la informacion de las monedas ")
    public List<HuCatMoneda> buscarPorParametros(
            @RequestParam(required = false) String claveMoneda,
            @RequestParam(required = false) String descripcion,
            @RequestParam(required = false) String simbolo,
            @RequestParam(required = false) String abreviacion,
            @RequestParam(required = false) String monedaCorriente,
            @RequestParam(required = false) String status) {
        return service.buscarPorParametros(claveMoneda, descripcion, simbolo, abreviacion, monedaCorriente, status);
    }
}

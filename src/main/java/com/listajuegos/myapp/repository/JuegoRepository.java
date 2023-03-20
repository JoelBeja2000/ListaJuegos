package com.listajuegos.myapp.repository;

import com.listajuegos.myapp.domain.Juego;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data  repository for the Juego entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JuegoRepository extends JpaRepository<Juego, Long> {
    

    @Query("SELECT j FROM Juego j WHERE j.estado = :estado AND (YEAR(j.fechaFin) = :fechaFin OR :fechaFin IS NULL)")
    List<Juego> findByEstado(@Param("estado") String estado, @Param("fechaFin") Integer fechaFin);
    

    
}

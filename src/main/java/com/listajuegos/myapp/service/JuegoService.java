package com.listajuegos.myapp.service;

import com.listajuegos.myapp.domain.Juego;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Juego}.
 */
public interface JuegoService {

    /**
     * Save a juego.
     *
     * @param juego the entity to save.
     * @return the persisted entity.
     */
    Juego save(Juego juego);

    /**
     * Get all the juegos.
     *
     * @return the list of entities.
     */
    List<Juego> findAll(String estado,Integer fechaFin);


    /**
     * Get the "id" juego.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Juego> findOne(Long id);

    /**
     * Delete the "id" juego.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

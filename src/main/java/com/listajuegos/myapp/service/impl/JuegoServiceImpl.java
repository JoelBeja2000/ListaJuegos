package com.listajuegos.myapp.service.impl;

import com.listajuegos.myapp.service.JuegoService;
import com.listajuegos.myapp.domain.Juego;
import com.listajuegos.myapp.repository.JuegoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Juego}.
 */
@Service
@Transactional
public class JuegoServiceImpl implements JuegoService {

    private final Logger log = LoggerFactory.getLogger(JuegoServiceImpl.class);

    private final JuegoRepository juegoRepository;

    public JuegoServiceImpl(JuegoRepository juegoRepository) {
        this.juegoRepository = juegoRepository;
    }

    /**
     * Save a juego.
     *
     * @param juego the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Juego save(Juego juego) {
        log.debug("Request to save Juego : {}", juego);
        return juegoRepository.save(juego);
    }

    /**
     * Get all the juegos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Juego> findAll(String estado, Integer fechaFin) {
        log.debug("Request to get all Juegos with estado: {}", estado);
        if (estado != null) {
            return juegoRepository.findByEstado(estado, fechaFin);
        } else {
            return juegoRepository.findAll();
        }
    }
    


    /**
     * Get one juego by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Juego> findOne(Long id) {
        log.debug("Request to get Juego : {}", id);
        return juegoRepository.findById(id);
    }

    /**
     * Delete the juego by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Juego : {}", id);
        juegoRepository.deleteById(id);
    }
}

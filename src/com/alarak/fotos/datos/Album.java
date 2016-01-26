package com.alarak.fotos.datos;

import lombok.Data;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
@Data 
public class Album {
	@Id
	private String nombre;
	private String urlThumbnail;
}

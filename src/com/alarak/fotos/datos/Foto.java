package com.alarak.fotos.datos;

import java.util.Date;

import lombok.Data;

import com.google.appengine.api.datastore.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
@Data 
public class Foto {
	@Id
	private Long ID;
	private String nombre;
	private String url;
	private String urlThumbnail;
	private String tags;
	private Date fecha;
	@Index
	private Key album;
}

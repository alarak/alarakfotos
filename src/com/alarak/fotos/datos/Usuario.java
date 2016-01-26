package com.alarak.fotos.datos;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

import lombok.Data;

@Entity
@Data 
public class Usuario {
	private String Nombre;
	@Id
	private String Email;
	private String Passwd;
}

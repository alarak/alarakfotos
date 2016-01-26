package com.alarak.fotos.negocios;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alarak.fotos.datos.Album;
import com.alarak.fotos.datos.Foto;
import com.alarak.fotos.datos.Usuario;
import com.googlecode.objectify.ObjectifyService;

public class Inicio extends HttpServlet {

	static {
        ObjectifyService.register(Usuario.class);
        ObjectifyService.register(Foto.class);
        ObjectifyService.register(Album.class);
    }
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3306585118930578549L;

	@Override
	  public void doGet(HttpServletRequest req, HttpServletResponse resp)
	      throws IOException {
	   	  }
}

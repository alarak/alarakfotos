package com.alarak.fotos.negocios;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.alarak.fotos.datos.Album;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;

@Api(name = "albumApi",
version = "v1",
namespace = @ApiNamespace(ownerDomain = "helloworld.example.com",
                           ownerName = "helloworld.example.com",
                           packagePath=""))
public class AlbumNeg {
	
	@ApiMethod(name = "nuevoAlbum")
	public Album nuevoAlbum(@Named("nombre") String nombre){
		Album album = new Album();
		album.setNombre(nombre);
		ofy().save().entity(album).now();
		return album;
	}
	
	@ApiMethod(name = "eliminarAlbum")
	public void eliminarFoto(@Named("nombre") String nombre){
		Album alb= ofy().load().type(Album.class).id(nombre).now();
		if(alb != null)
			ofy().delete().entity(alb).now();
	}
	
	@ApiMethod(name = "obtenerAlbumes")
	public List<Album> obtenerAlbumes(){
		List<Album> albumes= ofy().load().type(Album.class).list();
		return albumes;
	}

}

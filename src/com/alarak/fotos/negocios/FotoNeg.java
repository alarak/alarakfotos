package com.alarak.fotos.negocios;

import java.util.List;

import com.alarak.fotos.datos.Album;
import com.alarak.fotos.datos.Foto;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.Named;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

import static com.googlecode.objectify.ObjectifyService.ofy;

@Api(name = "fotoApi",
version = "v1")
public class FotoNeg {

	@ApiMethod(name = "nuevaFoto")
	public Foto nuevaFoto(Foto foto, @Named("nombreAlbum") String album){
		Key key= KeyFactory.createKey("Album", album);
		foto.setAlbum(key);
		ofy().save().entity(foto).now();
		return foto;
	}
	
	@ApiMethod(name = "actualizarFoto")
	public Foto actualizarFoto(Foto foto){
		ofy().save().entity(foto).now();
		return foto;
	}
	
	@ApiMethod(name = "eliminarFoto")
	public void eliminarFoto(Foto foto){
		ofy().delete().entity(foto).now();
		
	}
	
	@ApiMethod(name = "obtenerFotoPorID")
	public Foto obtenerFotoPorID(@Named("id") long iD){
		Foto foto= ofy().load().type(Foto.class).id(iD).now();
		return foto;
	}
	
	@ApiMethod(name = "obtenerFotosPorAlbum")
	public List<Foto> obtenerFotosPorAlbum(Album album){
		List<Foto> fotos= ofy().load().type(Foto.class).filter("album", album).list();
		return fotos;
	}
	
	@ApiMethod(name = "obtenerFotoUploadUrl")
	public Foto obtenerFotoUploadUrl(){
		Foto foto= new Foto();
		BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		foto.setUrl(blobstoreService.createUploadUrl("/foto"));
		return foto;
	}
}

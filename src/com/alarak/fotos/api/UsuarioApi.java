package com.alarak.fotos.api;

import java.util.ArrayList;
import java.util.List;

import com.alarak.fotos.datos.Usuario;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;

@Api(name = "usuarioApi",
version = "v1",
namespace = @ApiNamespace(ownerDomain = "helloworld.example.com",
                           ownerName = "helloworld.example.com",
                           packagePath=""))
public class UsuarioApi {
	
	@ApiMethod(name = "nuevoUsuario")
	public Usuario nuevoUsuario(Usuario usuario){
		usuario.setNombre("Hola "+usuario.getNombre());
		return usuario;
	}
	
	public List<Usuario> listarUsuarios(){
		ArrayList<Usuario> usuarios= new ArrayList<Usuario>();
		Usuario usr = new Usuario();
		usr.setNombre("Juanito");
		usuarios.add(usr);
		usr = new Usuario();
		usr.setNombre("Petra");
		usuarios.add(usr);
		return usuarios;
	}
}

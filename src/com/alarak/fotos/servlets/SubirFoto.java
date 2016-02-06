package com.alarak.fotos.servlets;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

@SuppressWarnings("serial")
public class SubirFoto extends HttpServlet {
	private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {

		Map<String,List< BlobKey>> blobs = blobstoreService.getUploads(req);
		List<BlobKey> listaBlobs = blobs.get("foto");
		BlobKey blobKey = listaBlobs.get(0);
		if (blobKey == null) {
			res.sendRedirect("/");
		} else {
			String strStatus = "";
			try {

			} catch (Exception ex) {
				strStatus = "Could not update Twitter Status : "
						+ ex.getMessage();
			} finally {
				res.sendRedirect("/submitpic.jsp?blob-key="
						+ blobKey.getKeyString() + "&status=" + strStatus);
			}
		}
	}
}

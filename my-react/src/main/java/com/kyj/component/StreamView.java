package com.kyj.component;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.servlet.view.AbstractView;

@Component
@SessionScope
public class StreamView extends AbstractView {
  @Override
  public void renderMergedOutputModel(Map<String, Object> map, HttpServletRequest request, HttpServletResponse response) throws Exception {
    StringBuffer sb = new StringBuffer();   
    sb.append("C:/Users/yjk/Downloads/SampleVideo_1280x720_30mb.mp4");
    
    RandomAccessFile randomAccessFile = new RandomAccessFile(new File(sb.toString()), "r");
    
    long rangeStart = 0;
    long rangeEnd = 0;
    boolean isPart = false;
    
    try {
      long movieSize = randomAccessFile.length();
      String range = request.getHeader("range");
      
      System.out.println("range: " + range);
      
      if(range != null) {
        if(range.endsWith("-")) {
          range = range + (movieSize - 1);
        }
        
        int idxm = range.trim().indexOf("-");
        rangeStart = Long.parseLong(range.substring(6, idxm));
        rangeEnd = Long.parseLong(range.substring(idxm+1));
        if(rangeStart > 0) {
          isPart = true;
        }
      } else {
        rangeStart = 0;
        rangeEnd = movieSize - 1;
      }
      
      long partSize = rangeEnd - rangeStart + 1;
      
      response.reset();
      response.setStatus(isPart ? 206 : 200);
      
      response.setContentType("video/mp4");
      
      response.setHeader("Content-Range", "bytes "+rangeStart+"-"+rangeEnd+"/"+movieSize);
      response.setHeader("Accept-Ranges", "bytes");
      response.setHeader("Content-Length", ""+partSize);
      
      OutputStream out = response.getOutputStream();
      randomAccessFile.seek(rangeStart);
      
      int bufferSize = 8 * 1024;
      byte[] buf = new byte[bufferSize];
      do {
        int block = (partSize > bufferSize) ? bufferSize : (int)partSize;
        int len = randomAccessFile.read(buf, 0, block);
        out.write(buf, 0, len);
        partSize -= block;
      } while(partSize > 0);
      
      System.out.println("sent " + sb.toString());
    } catch(IOException e) {
    //  e.printStackTrace();
    } finally {
      randomAccessFile.close();
    }
  }
}
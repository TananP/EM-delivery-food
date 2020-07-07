import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubmitFormService {

  constructor() { }

  redirectWithPost(url, obj) {
    const mapForm = document.createElement('form');
    // mapForm.target = '_blank';
    mapForm.target = '_self';
    // mapForm.enctype = 'multipart/mixed';
    mapForm.method = 'POST'; // or "post" if appropriate
    mapForm.action = url;
    Object.keys(obj).forEach(param => {
      const mapInput = document.createElement('input');
      mapInput.type = 'hidden';
      mapInput.name = param;
      mapInput.setAttribute('value', obj[param]);
      mapForm.appendChild(mapInput);
  });
    // document.head.appendChild(testHeader);
    document.body.appendChild(mapForm);
    // console.log(mapForm);
    // debugger;
    mapForm.submit();
  }
}

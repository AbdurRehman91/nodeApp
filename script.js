import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  //http.get('https://test.k6.io');
  var url = 'http://localhost:8010/api/jobListing';
  var payload = JSON.stringify({
    jobTitle: 'testName',
    company: 'testCompany',
    location: 'Lahore',
    postDate: '5-4-2021',
    applyEmail: 'test@app.com',
    leaveType: 'Monthly',
    trending: 'true'
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
  sleep(1);
}
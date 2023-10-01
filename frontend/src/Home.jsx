import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
  // const [adminCount, setAdminCount] = useState();
  // const [userCount, setUserCount] = useState();
  const authToken = localStorage.getItem('authToken');
  // useEffect(() => {
  //   // Simulate fetching admin and employee counts
  //   const adminCount = 10; // Replace with actual admin count
  //   const userCount = 100; // Replace with actual employee count

  //   setAdminCount(adminCount);
  //   setUserCount(userCount);
  // }, []);

  const [adminCount, setAdminCount] = useState(0)
  const [userCount, setUserCount] = useState(0)
 

  useEffect(() => {
    axios.get('http://localhost:4000/admin/getUserList',{
			headers: {
			  Authorization: `Bearer ${authToken}`,
			},
		  })
		.then(res => {
      if(res.data.success==true){
      let admincount=res.data.data.length
			setAdminCount(admincount)
      }
		}).catch(err => console.log(err));

    axios.get('http://localhost:4000/admin/getSubadminList',{
			headers: {
			  Authorization: `Bearer ${authToken}`,
			},
		  })
		.then(res => {
      if(res.data.success==true){
      let usercount=res.data.data.length;
			setUserCount(usercount)
    }
		}).catch(err => console.log(err));


  } , [])

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin Count</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Team Member Count</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {userCount}</h5>
          </div>
        </div>
      </div>

      {/* Display static and meaningful data */}
      <div className='mt-4 px-5 pt-3'>
        <h3>Latest Updates</h3>
        <div className='border p-3 shadow-sm'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus non nisl faucibus vehicula.
            Vivamus euismod quam id aliquet. 
          </p>
          <p>
            Suspendisse potenti. In feugiat, dui non interdum mattis, arcu felis efficitur ex, vel tristique elit
            erat a justo. Sed eu varius dui. Nulla facilisi.
          </p>
          <p>
            Phasellus vel mi et erat congue laoreet. Nullam nec ex id neque mattis elementum. Proin auctor, nisl
            non tempus ultricies, justo ex fermentum est, vel dignissim metus urna vel odio. Aliquam erat volutpat.
          </p>
        </div>
      </div>

      {/* Rules and Regulations */}
      <div className='mt-4 px-5 pt-3'>
        <h3>Rules and Regulations</h3>
        <div className='border p-3 shadow-sm'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus non nisl faucibus vehicula.
            Vivamus euismod quam id aliquet. Duis in ex eu arcu malesuada lacinia. 
          </p>
          <p>
            Suspendisse potenti. In feugiat, dui non interdum mattis, arcu felis efficitur ex, vel tristique elit
            erat a justo. Sed eu varius dui. Nulla facilisi. Nam vitae tortor eget nisi cursus varius. Nam
            scelerisque enim nec justo cursus, a efficitur quam tristique. Proin vel turpis nisl.
          </p>
          <p>
            Phasellus vel mi et erat congue laoreet. Nullam nec ex id neque mattis elementum. 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

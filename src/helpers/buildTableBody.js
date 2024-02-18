
const buildTableBody = (data) => {
  const { shift, jobs, posts, cols } = data;
  // console.log(data);
  let tableBody = [];
  let miscJobs = [];
  jobs.map((job) => {
    if (job[shift.id]) {
      if (!job.data) {
        job.show = false;
        miscJobs.push(job);
        for (const key in posts) {
          const post = posts[key];
          if (post.shift === shift.id) {
            if (post.pos === job.id) {
              if (post.date >= cols[0].label) {
                if (post.date <= cols[6].label) {
                  job.show = true;
                }
              }
            }
          }
        }
      } else {
        job.show = true;
      }
      if (job.show) tableBody.push(job);
    }
  });
  return [tableBody, miscJobs]
};

export default buildTableBody;
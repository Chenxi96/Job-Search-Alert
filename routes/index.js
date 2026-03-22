import express from 'express';
import 'dotenv/config';
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    const body = JSON.stringify({
    "order_by": [
      {
        "desc": true,
        "field": "date_posted"
      },
      {
        "desc": true,
        "field": "discovered_at"
      }
    ],
    "offset": 0,
    "page": 0,
    "limit": 25,
    "job_title_or": ["Software Engineer", "Software Developer", "Full-Stack Developer", "Web Developer"],
    "job_title_not": [],
    "job_title_pattern_and": [],
    "job_title_pattern_or": [],
    "job_title_pattern_not": [],
    "job_country_code_or": ["CA"],
    "job_country_code_not": [],
    "posted_at_max_age_days": 1,
    "job_description_pattern_or": [],
    "job_description_pattern_not": [],
    "job_description_pattern_is_case_insensitive": true,
    "job_description_contains_or": [],
    "job_description_contains_not": [],
    "job_description_pattern_case_sensitive_or": [],
    "job_id_or": [],
    "job_id_not": [],
    "job_ids": [],
    "job_seniority_or": ["junior"],
    "job_technology_slug_or": [],
    "job_technology_slug_not": [],
    "job_technology_slug_and": [],
    "job_keyword_slug_or": [],
    "job_keyword_slug_and": [],
    "job_keyword_slug_not": [],
    "job_location_pattern_or": [],
    "job_location_pattern_not": [],
    "job_location_or": [{id:6167865}], // Toronto, Ontario
    "job_location_not": [],
    "url_domain_or": [],
    "url_domain_not": [],
    "scraper_name_pattern_or": [],
    "company_name_or": [],
    "company_name_case_insensitive_or": [],
    "company_id_or": [],
    "company_domain_or": [],
    "company_domain_not": [],
    "company_name_not": [],
    "company_name_partial_match_or": [],
    "company_name_partial_match_not": [],
    "company_linkedin_url_or": [],
    "blur_company_data": true,
    "property_exists_or": [],
    "property_exists_and": [],
    "company_description_pattern_or": [],
    "company_description_pattern_not": [],
    "company_description_pattern_accent_insensitive": false,
    "funding_stage_or": [],
    "industry_or": [],
    "industry_not": [],
    "industry_id_or": [],
    "industry_id_not": [],
    "company_tags_or": [],
    "company_investors_or": [],
    "company_investors_partial_match_or": [],
    "company_technology_slug_or": [],
    "company_technology_slug_and": [],
    "company_technology_slug_not": [],
    "company_keyword_slug_or": [],
    "company_keyword_slug_and": [],
    "company_keyword_slug_not": [],
    "only_yc_companies": false,
    "company_location_pattern_or": [],
    "company_country_code_or": [],
    "company_country_code_not": [],
    "company_list_id_or": [],
    "company_list_id_not": [],
    "include_total_results": false
  })

  const response = await fetch("https://api.theirstack.com/v1/jobs/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.AUTH}`
    },
    body
  })

  const data = await response.json().data;
  console.log(data)
  if(data && data.length > 0) {
    let textBody = `Hi Chenxi, <br>
    Here are the Job that we found for today: <br>`;

    data.forEach((job, index) => {
        const jobList = `<br>
                        Company: ${job.company}
                        <br>
                        Job title: ${job.job_title}
                        <br>
                        URL: ${job.url}
                        <br>
                        Job Description: ${job.description}
                        <br>
                        `
        textBody += jobList;
    })
    
    await transporter.sendMail({
      from: "lin.chenxi14@gmail.com",
      to: "lin.chenxi14@gmail.com",
      subject: "Job Search Alert",
      text: textBody, // Plain-text version of the message
      html: textBody, // HTML version of the message
    });
  }
  res.status(200).json({
    data: data
  });
});

export default router;

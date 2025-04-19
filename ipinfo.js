export async function getIpInfo(ip) {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    
    if (!response.ok) {
      throw new Error(`IP Info API error: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      loc: data.loc,
      org: data.org
    };
  } catch (error) {
    console.error('Error fetching IP info:', error);
    throw error;
  }
} 
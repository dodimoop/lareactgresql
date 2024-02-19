import { Link } from '@inertiajs/react';
import React from 'react'

const Pagination = ({ meta }) => {
  const { current_page, to, total, links } = meta

  const prev = links[0]?.url;
  const next = links[links.length - 1]?.url;
  const current = current_page;
  
  return (
    <div className="join">
      <Link className="join-item btn" href={prev} disabled={!prev}>«</Link>
      <Link className="join-item btn">{current} to {to} of {total}</Link>
      <Link className="join-item btn" href={next} disabled={!next}>»</Link>
    </div>
  )
}

export default Pagination;
"use client"
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    IconDashboard,
    IconGraph,
    IconHomeCog,
    IconGavel,
    IconUserEdit,
    IconHomeEdit,
    IconPhotoEdit,
    IconHomeQuestion,
    IconAd
  } from "@tabler/icons-react";

const Breadcrumb = () => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const breadcrumbData = [
            { label: 'Dashboard', path: '/dashboard', icon : <IconDashboard/> },
            { label: 'Analytics', path: '/dashboard/analytics', icon : <IconGraph/> },
            { label: 'Remo', path: '/dashboard/remo', icon : <IconHomeCog/> },
            { label: 'Legal Forms', path: '/dashboard/forms' , icon : <IconGavel/>},
            { label: 'Services Forms', path: '/dashboard/realestate' , icon : <IconHomeQuestion/>},
            { label: 'Users', path: '/dashboard/users' , icon : <IconUserEdit/>},
            { label: 'Properties', path: '/dashboard/properties',icon : <IconHomeEdit/> },
            { label: 'Events', path: '/dashboard/events' , icon : <IconPhotoEdit/>},
            { label: 'Advertising', path: '/dashboard/advertising' , icon : <IconAd/>}
        ];
        
        const currentBreadcrumbs = breadcrumbData.filter(item => pathname.startsWith(item.path));
        setBreadcrumbs(currentBreadcrumbs);
    }, [pathname]);

    return (
        <section className='bg-gray-100 py-2 px-2 xl:px-4 rounded-md border-2 border-gray-200 w-full'>
            <nav aria-label='breadcrumb'>
                <ol className='flex space-x-4'>
                    {
                        breadcrumbs.map((breadcrumb, index) => (
                            <li key={index} className='flex items-center'>
                                {index !== 0 && (
                                    <svg className='w-4 h-4 mr-1' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
                                    </svg>
                                )}
                                {
                                    index === breadcrumbs.length - 1 ? (
                                        <span className=' text-gray-500 flex'>{breadcrumb.icon} {breadcrumb.label}</span>
                                    ) : (
                                        <Link href={breadcrumb.path} className='text-blue-500 hover:underline flex '>{breadcrumb.icon}{breadcrumb.label}</Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ol>
            </nav>
        </section>
    );
};

export default Breadcrumb;

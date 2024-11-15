import React from 'react';

import { Rows3 } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {CiCircleChevUp} from "react-icons/ci";
import {Link} from "react-router-dom";

const AdminSidebar: React.FC = () => {
    return (
        <Sidebar>
            <SidebarContent>

                <SidebarHeader>
                    <Link to="/admin/dashboard" className="font-orbitron text-3xl flex justify-center items-center pt-2">
                        <CiCircleChevUp className="mr-1" />
                        NoDECT
                        <span className="text-sm">admin</span>
                    </Link>
                </SidebarHeader>

                {/* Categories */}

                <SidebarGroup>
                    <SidebarGroupLabel>Category</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/admin/category/list">
                                        <Rows3 />
                                        <span>Category List</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Suppliers */}

                <SidebarGroup>
                    <SidebarGroupLabel>Suppliers</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/admin/supplier/list">
                                        <Rows3 />
                                        <span>Supplier List</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/*Income*/}

                <SidebarGroup>
                    <SidebarGroupLabel>Income</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="#">
                                        <Rows3 />
                                        <span>Accounts</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarFooter>
                    Footer
                </SidebarFooter>

            </SidebarContent>
        </Sidebar>
    );
};

export default AdminSidebar;

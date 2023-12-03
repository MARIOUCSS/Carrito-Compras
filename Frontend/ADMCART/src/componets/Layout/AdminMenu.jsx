import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <div className="text-center">
      <div class="list-group">
        <h4>Admin Panel</h4>
        <ul class="list-group">
          <li class="list-group-item " aria-disabled="true">
            <NavLink
              to="/dashboard/admin/create-category"
              class="list-group-item list-group-item-action"
            >
              Create Category
            </NavLink>
          </li>
          <li class="list-group-item">
            <NavLink
              to="/dashboard/admin/create-product"
              class="list-group-item list-group-item-action"
            >
              Create Product
            </NavLink>
          </li>
          <li class="list-group-item">
            <NavLink
              to="/dashboard/admin/products"
              class="list-group-item list-group-item-action"
            >
              Products
            </NavLink>
          </li>
          <li class="list-group-item">
            <NavLink
              to="/dashboard/admin/users"
              class="list-group-item list-group-item-action"
            >
              User
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminMenu;

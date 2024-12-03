import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChartBarIcon,
  ChevronLeftIcon,
  DocumentChartBarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/solid";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: ChartBarIcon,
  },
  {
    name: "Trades",
    path: "/trades",
    icon: ArrowTrendingUpIcon,
    children: [
      { name: "Active", path: "/trades/active" },
      { name: "History", path: "/trades/history" },
      { name: "Pending", path: "/trades/pending" },
    ],
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: DocumentChartBarIcon,
    children: [
      { name: "Portfolio", path: "/analytics/portfolio" },
      { name: "Risk", path: "/analytics/risk" },
    ],
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gray-800 transition-all duration-300 p-4`}
    >
      <div className="flex justify-between items-center mb-8">
        {!collapsed && (
          <h1 className="text-white text-xl font-bold">Trading Pro</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <ChevronLeftIcon
            className={`w-6 h-6 text-white transform transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => (
          <div key={item.name}>
            <button
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                location.pathname === item.path
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
              {!collapsed && <span>{item.name}</span>}
            </button>

            {!collapsed && item.children && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children.map((child) => (
                  <button
                    key={child.name}
                    onClick={() => navigate(child.path)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      location.pathname === child.path
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {child.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

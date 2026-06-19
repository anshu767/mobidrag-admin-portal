import Topbar from '../layouts/Topbar';
import Card from '../components/Card';
import Table from '../components/Table';
import Badge from '../components/Badge';

const partners = [
  { id: 1, initials: 'SW', color: 'bg-violet-600', name: 'Shopify Wizards Agency', email: 'contact@swagency.io', type: 'Agency',   revenue: '$12,400', deals: 8,  status: 'Active' },
  { id: 2, initials: 'EG', color: 'bg-orange-500', name: 'Ecom Growth Studio',     email: 'hi@ecomgrowth.co',  type: 'Agency',   revenue: '$8,200',  deals: 6,  status: 'Active' },
  { id: 3, initials: 'RS', color: 'bg-emerald-600',name: 'RocketStack Consulting', email: 'bd@rocketstack.io', type: 'Reseller', revenue: '$6,100',  deals: 5,  status: 'Active' },
  { id: 4, initials: 'MA', color: 'bg-blue-600',   name: 'Mobilify Agency',        email: 'team@mobilify.com', type: 'Agency',   revenue: '$4,700',  deals: 4,  status: 'Active' },
  { id: 5, initials: 'BC', color: 'bg-rose-500',   name: 'Brew Collective',        email: 'info@brew.co',      type: 'Reseller', revenue: '$1,200',  deals: 2,  status: 'Inactive' },
];

const columns = [
  { key: 'name', label: 'Partner', render: (row) => (
    <div className="flex items-center gap-2">
      <div className={`w-7 h-7 rounded-full ${row.color} flex items-center justify-center text-white text-xs font-bold`}>
        {row.initials}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800">{row.name}</p>
        <p className="text-xs text-slate-400">{row.email}</p>
      </div>
    </div>
  )},
  { key: 'type',    label: 'Type' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'deals',   label: 'Deals', render: (row) => <span>{row.deals} deals</span> },
  { key: 'status',  label: 'Status', render: (row) => <Badge label={row.status} variant={row.status === 'Active' ? 'success' : 'default'} /> },
  { key: 'actions', label: '', render: () => (
    <button className="text-xs text-violet-600 hover:underline">View</button>
  )},
];

export default function Partners() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Topbar title="All Partners" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <Table columns={columns} data={partners} />
        </Card>
      </main>
    </div>
  );
}
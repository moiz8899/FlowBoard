import { CalendarDays, CircleDollarSign, PhoneCall, UserPlus } from "lucide-react";

const kpis = [
  { label: "New Leads", value: "128", change: "+18%", icon: UserPlus },
  { label: "Pipeline", value: "$42.8k", change: "+12%", icon: CircleDollarSign },
  { label: "Calls Booked", value: "34", change: "+9%", icon: PhoneCall },
  { label: "Close Rate", value: "31%", change: "+4%", icon: CalendarDays }
];

const stages = [
  { label: "Lead", value: "$8.4k", height: 72 },
  { label: "Qualified", value: "$14k", height: 112 },
  { label: "Proposal", value: "$21k", height: 154 },
  { label: "Won", value: "$31k", height: 196 }
];

const leads = [
  { name: "Acme Studio", stage: "Proposal", value: "$6,200" },
  { name: "Northwind Labs", stage: "Qualified", value: "$4,800" },
  { name: "Orbit Finance", stage: "Discovery", value: "$3,400" },
  { name: "BrightLearn", stage: "Won", value: "$7,900" }
];

export function HeroDashboardMockup() {
  return (
    <div className="animate-float-mockup">
      <div className="mx-auto max-w-2xl rounded-lg border border-line bg-surface p-3 shadow-glow">
        <div className="rounded-md border border-line bg-[#0d0d14] p-4">
          <div className="mb-5 flex items-center justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">FreelanceCRM</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-white">Sales Overview</h2>
              <p className="mt-1 text-sm text-muted">May pipeline performance</p>
            </div>
            <div className="rounded-md bg-accent px-4 py-3 text-right">
              <p className="text-xs font-semibold text-indigo-100">Revenue</p>
              <p className="font-display text-xl font-bold text-white">$42,850</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-md border border-line bg-white/[0.03] p-3">
                <div className="flex items-center justify-between">
                  <kpi.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="text-xs font-semibold text-emerald-300">{kpi.change}</span>
                </div>
                <p className="mt-4 font-display text-xl font-bold text-white">{kpi.value}</p>
                <p className="mt-1 text-xs text-muted">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="rounded-md border border-line bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Pipeline Value</h3>
                  <p className="text-xs text-muted">By sales stage</p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                  +$9.2k
                </span>
              </div>
              <div className="flex h-52 items-end gap-4">
                {stages.map((stage) => (
                  <div key={stage.label} className="flex min-w-0 flex-1 flex-col items-center">
                    <div className="mb-2 text-xs font-semibold text-white">{stage.value}</div>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-accent to-emerald-400"
                      style={{ height: stage.height }}
                    />
                    <div className="mt-2 w-full truncate text-center text-xs text-muted">{stage.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-line bg-white/[0.03] p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">Hot Leads</h3>
                <span className="text-xs font-semibold text-accent">Live</span>
              </div>
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead.name} className="rounded-md border border-line bg-ink/70 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-white">{lead.name}</p>
                      <span className="text-xs font-semibold text-emerald-300">{lead.value}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted">
                      <span>{lead.stage}</span>
                      <span>Owner: Moiz</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

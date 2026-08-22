import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Server, 
  Code2, 
  ShieldCheck, 
  Terminal, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  Layers, 
  FileJson, 
  Clock, 
  Send,
  Users,
  Calculator,
  HardDrive,
  Copy,
  Check,
  Download,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MernStackView: React.FC = () => {
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'collections' | 'shell' | 'api' | 'architecture'>('collections');
  const [selectedCollection, setSelectedCollection] = useState<'students' | 'users' | 'predictions'>('students');
  
  // Data state
  const [dbData, setDbData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbMetrics, setDbMetrics] = useState<any>(null);
  
  // Shell state
  const [queryInput, setQueryInput] = useState('db.students.find({ Attendance_Percentage: { "$lt": 75 } })');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [queryRunning, setQueryRunning] = useState(false);
  
  // API Tester state
  const [apiEndpoint, setApiEndpoint] = useState('/api/analytics');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiPayload, setApiPayload] = useState('{\n  "attendancePercentage": 85,\n  "studyHoursPerDay": 5.5,\n  "previousScore": 80,\n  "assignmentScore": 88,\n  "midtermScore": 82,\n  "practicalScore": 90,\n  "internalMarks": 85\n}');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch Database Metrics and Collection Data
  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/database/status');
      if (res.ok) {
        const data = await res.json();
        setDbMetrics(data);
      }
    } catch (err) {
      console.log('Metrics fetch fallback');
    }
  };

  const fetchCollection = async (collName: string) => {
    setLoading(true);
    try {
      if (collName === 'students') {
        const res = await fetch('/api/students');
        const data = await res.json();
        setDbData(data.students || []);
      } else if (collName === 'users') {
        const res = await fetch('/api/auth/users');
        const data = await res.json();
        setDbData(data.users || []);
      } else if (collName === 'predictions') {
        const res = await fetch('/api/predictions');
        const data = await res.json();
        setDbData(data.predictions || []);
      }
    } catch (err) {
      console.error('Error fetching collection', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchCollection(selectedCollection);
  }, [selectedCollection]);

  // Execute Shell Query
  const handleExecuteQuery = async () => {
    setQueryRunning(true);
    try {
      // Parse query e.g. db.students.find({ ... })
      let collection = 'students';
      let action = 'find';
      let jsonFilter = {};

      const trimmed = queryInput.trim();
      const match = trimmed.match(/db\.(\w+)\.(\w+)\((.*)\)/s);
      
      if (match) {
        collection = match[1];
        action = match[2];
        const inner = match[3]?.trim();
        if (inner) {
          try {
            jsonFilter = JSON.parse(inner);
          } catch (e) {
            // relaxed parser
            jsonFilter = eval(`(${inner})`);
          }
        }
      }

      const res = await fetch('/api/database/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, action, query: jsonFilter })
      });
      const data = await res.json();
      setQueryResult(data);
    } catch (err: any) {
      setQueryResult({ ok: 0, error: err.message || 'Execution error' });
    } finally {
      setQueryRunning(false);
    }
  };

  // Run API Test
  const handleRunApiTest = async () => {
    setApiLoading(true);
    const start = performance.now();
    try {
      const options: RequestInit = {
        method: apiMethod,
        headers: { 'Content-Type': 'application/json' }
      };
      if (apiMethod === 'POST' || apiMethod === 'PUT') {
        options.body = apiPayload;
      }
      const res = await fetch(apiEndpoint, options);
      const data = await res.json();
      const latency = +(performance.now() - start).toFixed(1);
      setApiResponse({ status: res.status, statusText: res.statusText, latencyMs: latency, body: data });
    } catch (err: any) {
      setApiResponse({ status: 500, error: err.message });
    } finally {
      setApiLoading(false);
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dbData, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", `smartgrade_${selectedCollection}_collection.json`);
    dl.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <Server className="w-5 h-5 text-[#5A6B5D]" />
            <h2 className="text-xl font-serif font-bold text-[#4A443F]">
              Local Server & Node.js Express Backend
            </h2>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#5A6B5D]/10 text-[#5A6B5D] border border-[#5A6B5D]/20">
              Local Server • In-Memory Store • REST API
            </span>
          </div>
          <p className="text-xs text-[#8C847C]">
            Self-contained local Node.js / Express backend server running on port 3000 with in-memory JSON data storage, JWT auth, and live REST endpoints.
          </p>
        </div>

        {/* Database Status Pills */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-[#F9F8F6] border border-[#E5E2DD] px-3 py-2 rounded-xl flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <span className="font-bold text-[#4A443F] block text-[11px]">Local Data Store</span>
              <span className="text-[10px] text-[#8C847C]">In-Memory / Active (3 Datasets)</span>
            </div>
          </div>

          <div className="bg-[#F9F8F6] border border-[#E5E2DD] px-3 py-2 rounded-xl flex items-center space-x-2">
            <Server className="w-4 h-4 text-[#5A6B5D]" />
            <div>
              <span className="font-bold text-[#4A443F] block text-[11px]">Express REST Server</span>
              <span className="text-[10px] text-[#8C847C]">Port 3000 / Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="flex bg-[#F2EFE9] p-1 rounded-2xl border border-[#E5E2DD] overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSubTab('collections')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            activeSubTab === 'collections'
              ? 'bg-white text-[#4A443F] shadow-xs'
              : 'text-[#8C847C] hover:text-[#4A443F]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#5A6B5D]" />
          <span>Active Datasets ({dbMetrics?.collections?.students?.count || 60}+ records)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('shell')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            activeSubTab === 'shell'
              ? 'bg-white text-[#4A443F] shadow-xs'
              : 'text-[#8C847C] hover:text-[#4A443F]'
          }`}
        >
          <Terminal className="w-4 h-4 text-[#5A6B5D]" />
          <span>Data Query & Filter Engine</span>
        </button>

        <button
          onClick={() => setActiveSubTab('api')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            activeSubTab === 'api'
              ? 'bg-white text-[#4A443F] shadow-xs'
              : 'text-[#8C847C] hover:text-[#4A443F]'
          }`}
        >
          <Send className="w-4 h-4 text-[#5A6B5D]" />
          <span>REST API Diagnostics</span>
        </button>

        <button
          onClick={() => setActiveSubTab('architecture')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            activeSubTab === 'architecture'
              ? 'bg-white text-[#4A443F] shadow-xs'
              : 'text-[#8C847C] hover:text-[#4A443F]'
          }`}
        >
          <Server className="w-4 h-4 text-[#5A6B5D]" />
          <span>System Architecture</span>
        </button>
      </div>

      {/* 1. COLLECTIONS TAB */}
      {activeSubTab === 'collections' && (
        <div className="space-y-4">
          {/* Collection Selector & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E5E2DD]">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#4A443F]">Select Collection:</span>
              <div className="flex bg-[#F9F8F6] p-1 rounded-xl border border-[#E5E2DD]">
                <button
                  onClick={() => setSelectedCollection('students')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCollection === 'students'
                      ? 'bg-[#5A6B5D] text-white shadow-xs'
                      : 'text-[#8C847C] hover:text-[#4A443F]'
                  }`}
                >
                  students ({dbMetrics?.collections?.students?.count || 20})
                </button>
                <button
                  onClick={() => setSelectedCollection('users')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCollection === 'users'
                      ? 'bg-[#5A6B5D] text-white shadow-xs'
                      : 'text-[#8C847C] hover:text-[#4A443F]'
                  }`}
                >
                  users ({dbMetrics?.collections?.users?.count || 3})
                </button>
                <button
                  onClick={() => setSelectedCollection('predictions')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCollection === 'predictions'
                      ? 'bg-[#5A6B5D] text-white shadow-xs'
                      : 'text-[#8C847C] hover:text-[#4A443F]'
                  }`}
                >
                  predictions ({dbMetrics?.collections?.predictions?.count || 0})
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => fetchCollection(selectedCollection)}
                className="px-3 py-1.5 bg-[#F9F8F6] hover:bg-[#F2EFE9] border border-[#E5E2DD] rounded-xl text-xs text-[#4A443F] font-medium flex items-center space-x-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleExportJson}
                className="px-3 py-1.5 bg-[#5A6B5D] hover:bg-[#4d5c4f] text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON Dump</span>
              </button>
            </div>
          </div>

          {/* Documents Table / Viewer */}
          <div className="bg-white rounded-2xl border border-[#E5E2DD] shadow-xs overflow-hidden">
            <div className="p-4 bg-[#F9F8F6] border-b border-[#E5E2DD] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileJson className="w-4 h-4 text-[#5A6B5D]" />
                <span className="text-xs font-bold text-[#4A443F] font-mono">
                  db.{selectedCollection}.find()
                </span>
                <span className="text-xs text-[#8C847C]">
                  ({dbData.length} documents loaded)
                </span>
              </div>
              <span className="text-[11px] text-[#8C847C]">
                Schema: Mongoose Document Model
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-[#8C847C]">
                <div className="w-6 h-6 border-2 border-[#5A6B5D] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Loading documents from MongoDB...
              </div>
            ) : dbData.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#8C847C]">
                No documents found in collection <code className="text-[#5A6B5D] font-mono">{selectedCollection}</code>.
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto divide-y divide-[#E5E2DD]/60">
                {dbData.map((doc, idx) => (
                  <div key={doc._id || idx} className="p-4 hover:bg-[#F9F8F6] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-[#5A6B5D]">
                          _id: "{doc._id}"
                        </span>
                        {doc.Student_Name && (
                          <span className="text-xs font-semibold text-[#4A443F]">
                            • {doc.Student_Name} ({doc.Student_ID})
                          </span>
                        )}
                        {doc.name && (
                          <span className="text-xs font-semibold text-[#4A443F]">
                            • {doc.name} ({doc.role})
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#8C847C]">
                        {doc.createdAt || doc.timestamp || 'Indexed'}
                      </span>
                    </div>

                    <pre className="bg-[#2D2A26] text-[#E5E2DD] p-3 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed">
                      {JSON.stringify(doc, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. MQL SHELL CONSOLE */}
      {activeSubTab === 'shell' && (
        <div className="space-y-4">
          <div className="bg-[#2D2A26] rounded-2xl border border-[#4A443F] shadow-lg overflow-hidden text-[#E5E2DD]">
            {/* Terminal Header */}
            <div className="bg-[#211E1B] px-4 py-3 border-b border-[#3D3A36] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#E57373]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFB74D]" />
                  <div className="w-3 h-3 rounded-full bg-[#81C784]" />
                </div>
                <span className="text-xs font-mono text-[#A8A29E] ml-2">
                  node-server-query --host localhost:3000/api
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D3A36] text-[#81C784]">
                Local Node.js Engine Active
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 space-y-4">
              <div className="text-xs text-[#A8A29E] space-y-1 font-mono">
                <p>SmartGrade Local Server Engine [http://localhost:3000/api/database/query]&gt;</p>
                <p className="text-[11px] text-[#8C847C]">Quick presets: Filter in-memory student records, evaluate user accounts, or inspect predictions.</p>
              </div>

              {/* Sample Quick Query Buttons */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <button
                  onClick={() => setQueryInput('db.students.find({ Attendance_Percentage: { "$lt": 75 } })')}
                  className="px-2.5 py-1 bg-[#3D3A36] hover:bg-[#4D4A46] rounded-lg text-[11px] text-[#E5E2DD] transition-colors"
                >
                  Attendance &lt; 75%
                </button>
                <button
                  onClick={() => setQueryInput('db.students.find({ Grade: "A+" })')}
                  className="px-2.5 py-1 bg-[#3D3A36] hover:bg-[#4D4A46] rounded-lg text-[11px] text-[#E5E2DD] transition-colors"
                >
                  Grade == "A+"
                </button>
                <button
                  onClick={() => setQueryInput('db.students.find({ Study_Hours_Per_Day: { "$gte": 6.0 } })')}
                  className="px-2.5 py-1 bg-[#3D3A36] hover:bg-[#4D4A46] rounded-lg text-[11px] text-[#E5E2DD] transition-colors"
                >
                  Study Hours &ge; 6.0
                </button>
                <button
                  onClick={() => setQueryInput('db.users.find({ role: "faculty" })')}
                  className="px-2.5 py-1 bg-[#3D3A36] hover:bg-[#4D4A46] rounded-lg text-[11px] text-[#E5E2DD] transition-colors"
                >
                  Faculty Users
                </button>
                <button
                  onClick={() => setQueryInput('db.predictions.find({})')}
                  className="px-2.5 py-1 bg-[#3D3A36] hover:bg-[#4D4A46] rounded-lg text-[11px] text-[#E5E2DD] transition-colors"
                >
                  All Predictions
                </button>
              </div>

              {/* Query Input Box */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 bg-[#1A1816] p-2.5 rounded-xl border border-[#3D3A36]">
                  <span className="text-[#81C784] font-mono text-sm font-bold">&gt;</span>
                  <input
                    type="text"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder='db.students.find({ ... })'
                    className="flex-1 bg-transparent font-mono text-xs text-[#E5E2DD] focus:outline-hidden"
                  />
                  <button
                    onClick={handleExecuteQuery}
                    disabled={queryRunning}
                    className="px-4 py-1.5 bg-[#5A6B5D] hover:bg-[#6c7f70] text-white rounded-lg text-xs font-semibold font-mono flex items-center space-x-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{queryRunning ? 'Executing...' : 'Run Query'}</span>
                  </button>
                </div>
              </div>

              {/* Query Output Result */}
              {queryResult && (
                <div className="mt-4 pt-4 border-t border-[#3D3A36] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E]">
                    <span>
                      Execution Status: {queryResult.ok === 1 ? '✅ OK' : '❌ Failed'} | 
                      Matched: {queryResult.matchedCount ?? 0} docs
                    </span>
                    <span>Latency: {queryResult.executionTimeMs || 0} ms</span>
                  </div>

                  <pre className="bg-[#1A1816] p-4 rounded-xl text-xs font-mono text-[#A8E6CF] overflow-x-auto max-h-72 leading-relaxed">
                    {JSON.stringify(queryResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. REST API TESTER */}
      {activeSubTab === 'api' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Panel */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-[#E5E2DD]">
              <Send className="w-5 h-5 text-[#5A6B5D]" />
              <h3 className="font-serif font-bold text-sm text-[#4A443F]">
                Express.js REST API Request Builder
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#4A443F] block mb-1">Preset Endpoints</label>
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'predict') {
                      setApiMethod('POST');
                      setApiEndpoint('/api/predict');
                    } else if (val === 'analytics') {
                      setApiMethod('GET');
                      setApiEndpoint('/api/analytics');
                    } else if (val === 'students') {
                      setApiMethod('GET');
                      setApiEndpoint('/api/students');
                    } else if (val === 'users') {
                      setApiMethod('GET');
                      setApiEndpoint('/api/auth/users');
                    } else if (val === 'status') {
                      setApiMethod('GET');
                      setApiEndpoint('/api/database/status');
                    }
                  }}
                  className="w-full px-3 py-2 bg-[#F9F8F6] border border-[#E5E2DD] rounded-xl focus:outline-hidden"
                >
                  <option value="analytics">GET /api/analytics (Class KPI Aggregates)</option>
                  <option value="predict">POST /api/predict (Linear Regression ML)</option>
                  <option value="students">GET /api/students (Student Collection)</option>
                  <option value="users">GET /api/auth/users (Auth User Accounts)</option>
                  <option value="status">GET /api/database/status (MongoDB Engine Diagnostics)</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <select
                  value={apiMethod}
                  onChange={(e) => setApiMethod(e.target.value)}
                  className="w-24 px-3 py-2 bg-[#F9F8F6] border border-[#E5E2DD] rounded-xl font-bold font-mono text-[#5A6B5D]"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>

                <input
                  type="text"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#F9F8F6] border border-[#E5E2DD] rounded-xl font-mono text-[#4A443F]"
                />
              </div>

              {(apiMethod === 'POST' || apiMethod === 'PUT') && (
                <div>
                  <label className="font-semibold text-[#4A443F] block mb-1">Request Body (JSON)</label>
                  <textarea
                    rows={8}
                    value={apiPayload}
                    onChange={(e) => setApiPayload(e.target.value)}
                    className="w-full p-3 bg-[#2D2A26] text-[#E5E2DD] font-mono text-xs rounded-xl focus:outline-hidden"
                  />
                </div>
              )}

              <button
                onClick={handleRunApiTest}
                disabled={apiLoading}
                className="w-full py-2.5 bg-[#5A6B5D] hover:bg-[#4d5c4f] text-white font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>{apiLoading ? 'Sending HTTP Request...' : 'Send API Request'}</span>
              </button>
            </div>
          </div>

          {/* Response Panel */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs space-y-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DD]">
              <div className="flex items-center space-x-2">
                <FileJson className="w-5 h-5 text-[#5A6B5D]" />
                <h3 className="font-serif font-bold text-sm text-[#4A443F]">
                  HTTP Response Body
                </h3>
              </div>
              {apiResponse && (
                <span className={`text-xs font-mono px-2 py-0.5 rounded-full font-bold ${
                  apiResponse.status >= 200 && apiResponse.status < 300 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  HTTP {apiResponse.status} ({apiResponse.latencyMs} ms)
                </span>
              )}
            </div>

            <div className="flex-1 bg-[#2D2A26] text-[#E5E2DD] p-4 rounded-xl font-mono text-xs overflow-auto max-h-[400px]">
              {apiResponse ? (
                <pre>{JSON.stringify(apiResponse.body, null, 2)}</pre>
              ) : (
                <p className="text-[#8C847C] text-center pt-24">
                  Click "Send API Request" to test live Express REST API endpoints.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. ARCHITECTURE & CODE */}
      {activeSubTab === 'architecture' && (
        <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs space-y-6">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#E5E2DD]">
            <Code2 className="w-5 h-5 text-[#5A6B5D]" />
            <h3 className="font-serif font-bold text-base text-[#4A443F]">
              Local Full-Stack Server & Data Pipeline Architecture
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Local Store Card */}
            <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DD] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#5A6B5D]/15 text-[#5A6B5D] flex items-center justify-center font-bold">
                L
              </div>
              <h4 className="font-bold text-sm text-[#4A443F]">Local In-Memory DB</h4>
              <p className="text-xs text-[#8C847C]">
                Ultra-fast zero-configuration in-memory data store managing <code>students</code>, <code>users</code>, and <code>predictions</code> records.
              </p>
            </div>

            {/* Express Card */}
            <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DD] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#8A5D3B]/15 text-[#8A5D3B] flex items-center justify-center font-bold">
                E
              </div>
              <h4 className="font-bold text-sm text-[#4A443F]">Express.js REST API</h4>
              <p className="text-xs text-[#8C847C]">
                Local web routing framework serving <code>/api/auth/*</code>, <code>/api/students</code>, <code>/api/predict</code>, and analytical endpoints.
              </p>
            </div>

            {/* React Card */}
            <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DD] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-sky-600/15 text-sky-700 flex items-center justify-center font-bold">
                R
              </div>
              <h4 className="font-bold text-sm text-[#4A443F]">React 18 Frontend</h4>
              <p className="text-xs text-[#8C847C]">
                Component-driven frontend with Tailwind CSS, Recharts visualizations, real-time prediction sliders, and viva presentation tools.
              </p>
            </div>

            {/* Node Card */}
            <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DD] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-700/15 text-emerald-800 flex items-center justify-center font-bold">
                N
              </div>
              <h4 className="font-bold text-sm text-[#4A443F]">Node.js Runtime</h4>
              <p className="text-xs text-[#8C847C]">
                High-performance local JavaScript runtime orchestrating statistical calculations, ML coefficients, and API routing.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#F2EFE9] rounded-2xl border border-[#E5E2DD] space-y-2 text-xs text-[#4A443F]">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#5A6B5D]">
              College Project Defense Note: Local Full-Stack Node.js Architecture
            </h4>
            <p>
              The system operates entirely on a <strong>self-contained Local Server architecture</strong>. Express and Node.js provide authenticated multi-user REST API interfaces without requiring any external database connections, ensuring instant zero-latency responses, full offline portability, and zero credential dependencies.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

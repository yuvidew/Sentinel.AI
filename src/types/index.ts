// ========================
// Agent Interfaces
// ========================

export interface AgentMetadata {
  agentName: string;
  version: string;
  timestamp: Date;
}

export interface AgentMessage<T> {
  meta: AgentMetadata;
  data: T;
}

// ========================
// Log Types
// ========================

export interface RawLogInput {
  source: string;
  message: string;
  timestamp: string;
}

export interface AnalyzedLog {
  id: string;
  source: string;
  message: string;
  ip: string | null;
  user: string | null;
  eventType: string | null;
  timestamp: Date;
}

// ========================
// Threat Types
// ========================

export interface ThreatDetection {
  threatDetected: boolean;
  threatType: string | null;
  riskScore: number;
}

export interface ThreatClassification {
  severity: "LOW" | "MEDIUM" | "HIGH";
  explanation: string;
}

export interface ThreatDecision {
  action: "BLOCK_IP" | "ALERT_USER" | "LOG_ONLY" | "NONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export interface ThreatResponse {
  status: "OK" | "FAILED" | "IP_BLOCKED" | "ALERT_SENT";
  details: string;
}

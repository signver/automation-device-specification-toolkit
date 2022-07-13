enum ADSState {
  Invalid = 0,
  Idle = 1,
  Reset = 2,
  Init = 3,
  Start = 4,
  Run = 5,
  Stop = 6,
  SaveConfig = 7,
  LoadConfig = 8,
  PowerFailure = 9,
  PowerGood = 10,
  Error = 11,
  Shutdown = 12,
  Suspend = 13,
  Resume = 14,
  Config = 15, // system is in config mode
  Reconfig = 16, // system should restart in config mode
}

export default ADSState;

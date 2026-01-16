# Makefile for latencytest

# Load PROJECT_DIR and PLATFORM from local configuration file
LOCAL_CONFIG_FILE=config.mk
ifneq ($(wildcard $(LOCAL_CONFIG_FILE)),)
include $(LOCAL_CONFIG_FILE)
CONFIGURE=
else
CONFIGURE=configure
endif

ifneq ($(BR2_ENABLE_DEBUG),)
DEBUG=1
endif

# Is PROJECT_DIR specified?
ifeq ($(PROJECT_DIR),)
$(error "missing PROJECT_DIR, run make PROJECT_DIR=<project dir>")
endif

# Is PLATFORM specified?
ifeq ($(PLATFORM),)
$(error "missing PLATFORM, run make PLATFORM=<platform>")
endif

# Load project configuration file
PROJECT_CONFIG_FILE = $(PROJECT_DIR)/platform/$(PLATFORM).mk
ifneq ($(wildcard $(PROJECT_CONFIG_FILE)),)
include $(PROJECT_CONFIG_FILE)
else
$(error "missing project configuration; is PLATFORM=$(PLATFORM) valid?")
endif

ROMFSINST = /usr/bin/romfs-inst.sh

TARGET = multimacd

LIBELVUTILSPATH = ../elvutils
#LIBELVUTILSPATH = $(ELVUTILS_DIR)
LIBELVUTILS = elvutils

#OPENSSLDIR = ../openssl
#OPENSSLLIB = -L$(OPENSSLDIR)
#OPENSSLINC = -I$(OPENSSLDIR)/include
OPENSSLDIR =
OPENSSLLIB =
OPENSSLINC =

ifeq "$(DEBUG)" "1"
OPTIMIZE = -g -O0
#OPTIMIZE = -g -O0 -pg
else
OPTIMIZE = -O2 -g
endif

ifeq ($(PROJECT_VERSION),)
PROJECT_VERSION = $(shell ./version.sh)
endif

TARGETOBJS = \
		BidcosAesChallengeInfo.o \
		BidcosAesKey.o \
		BidcosContext.o \
		BidcosMacController.o \
		BidcosPeerContext.o \
		BidcosTelegram.o \
		BinaryData.o \
		Crc16.o \
		SerialFrame/CommonCommandFrame/CommonCommandFrame.o \
		SerialFrame/CommonCommandFrame/CommonCommandFrameGetSgtin.o \
		SerialFrame/CommonCommandFrame/CommonCommandFrameIdentify.o \
		SerialFrame/CommonCommandFrame/CommonCommandFrameIdentifyRequest.o \
		SerialFrame/CommonCommandFrame/CommonCommandFrameResponse.o \
		SerialFrame/CommonCommandFrame/CommonCommandFrameStartApplication.o \
		SerialFrame/CommonCommandFrame/CommonCommandFrameStartBootloader.o \
                SerialFrame/HmIpStackFrame/HmIpStackFrame.o \
                SerialFrame/HmIpStackFrame/HmIpStackFrameResponse.o \
        SerialFrame/RouterFrame/RouterFrame.o \
        SerialFrame/RouterFrame/RouterFrameResponse.o \
		Dynamic.o \
		FastMacResponder.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcos.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosGetDefaultRfAddress.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosGetPeers.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosGetPreviousAesKeyHash.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosGetRfAddress.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosPeerActivateAuth.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosPeerAdd.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosPeerDeactivateAuth.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosPeerGetAesKeyId.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosPeerRemove.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosPeerSetAesKeyId.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosResponse.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosRxTelegram.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosSetAesKey.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosSetPreviousAesKey.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosSetRfAddress.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosSetTempAesKey.o \
		SerialFrame/HmLegacyFrameBidcos/HmLegacyFrameBidcosTxTelegram.o \
		SerialFrame/HmLegacyFrame.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystem.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemCsmaCaControl.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemDutyCycleControl.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemDutyCycleEvent.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemDutyCycleRequest.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemGetSerialNumber.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemGetTeststatus.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemIdentify.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemResponse.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemSetTeststatus.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemSetTime.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemSetTxRate100k.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemSetTxRate10k.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemStartBootloader.o \
		SerialFrame/HmLegacyFrameSystem/HmLegacyFrameSystemVersionRequest.o \
		SerialFrame/InternalFrame/InternalFrame.o \
		SerialFrame/InternalFrame/InternalFrameIdentify.o \
		SerialFrame/InternalFrame/InternalFrameDutyCycle.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrame.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameGetDefaultRfAddress.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameGetSerialNumber.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameGetTimestamp.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameTxWithRxModeSet.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameResponse.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameResponseRfAddress.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameResponseSerialNumber.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameResponseTimestamp.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameRxTelegram.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameTx.o \
		SerialFrame/LowLevelMacFrame/LowLevelMacFrameRxModeDefault.o \
		SerialFrame/TrxAdapterFrame/TrxAdapterFrame.o \
		SerialFrame/TrxAdapterFrame/TrxAdapterFrameGetVersion.o \
		SerialFrame/TrxAdapterFrame/TrxAdapterFrameGetDutyCycle.o \
		SerialFrame/TrxAdapterFrame/TrxAdapterFrameResponse.o \
		SerialFrame/TrxAdapterFrame/TrxAdapterFrameDutyCycleEvent.o \
		SerialFrame/TrxAdapterFrame/TrxAdapterFrameCarrierSenseEvent.o \
		SerialFrame/TrxAdapterFrame/TrxAdapterFrameGetCarrierSense.o \
		SerialFrame/BackboneFrame/BackboneFrame.o \
		SerialFrame/BackboneFrame/BackboneFrameResponse.o \
		MacController.o \
		MacControllerQueueItem.o \
		multimacd.o \
		MultimacManager.o \
		MultithreadTest.o \
		SerialFrame/SerialFrame.o \
		Subsystem.o \
		SubsystemHmIp.o \
		SubsystemBidcos.o \
		SubsystemManager.o \
		Sysutils.o \
		tinythread.o \
		UpstreamCharConnection.o \
	
CC = $(CROSS)g++
CXX = $(CROSS)g++
STRIP = $(CROSS)strip

ifeq ($(CXXFLAGS),)
CXXFLAGS = $(OPTIMIZE) 
endif
CXXFLAGS += -std=c++11 -D_TIME_BITS=64 -D_FILE_OFFSET_BITS=64

CPPFLAGS += -I$(LIBELVUTILSPATH) $(OPENSSLINC) -Wall

LD_FLAGS += $(OPTIMIZE) --verbose -lc -lm -lrt -lpthread -L$(LIBELVUTILSPATH) -l$(LIBELVUTILS) $(OPENSSLLIB) -lcrypto

all: $(CONFIGURE) info prebuild $(TARGET)

DEP = $(TARGETOBJS:.o=.dep)
-include $(DEP)

configure:
	rm -f $(LOCAL_CONFIG_FILE)
	touch $(LOCAL_CONFIG_FILE)
	echo "PROJECT_DIR=$(PROJECT_DIR)" >> $(LOCAL_CONFIG_FILE)
	echo "PLATFORM=$(PLATFORM)" >> $(LOCAL_CONFIG_FILE)

info:
	@echo ""
	@echo "**************************"
	@echo "* MODULE $(TARGET)"
	@echo "**************************"
	@echo "* PROJECT_DIR = $(PROJECT_DIR)"
	@echo "* TARGET_DIR  = $(TARGET_DIR)"
	@echo "* BIN_DIR     = $(BIN_DIR)"
	@echo "**************************"
	@echo ""

prebuild:
	echo "#define MULTIMACD_VERSION \"$(PROJECT_VERSION)\"" > generated-multimacd-version.h

$(TARGET): $(TARGETOBJS)
	$(CXX) -o $(TARGET) $(TARGETOBJS) $(LD_FLAGS) $(LDFLAGS) 
	cp -f $(TARGET) $(TARGET).debug || true
	$(STRIP) $(TARGET)

%.o: %.cpp
	$(CXX) $(CXXFLAGS) $(CPPFLAGS) -c $< -o $@ -MD -MF $(@:.o=.dep)


install: $(TARGET)
	$(ROMFSINST) /bin/$(TARGET)

clean:
	find . \( -name "*.o" -o -name "*.dep" \) -exec rm \{\} \;
	rm -f config.mk
	rm -rf $(TARGET)
	rm -f $(TARGET).debug	


# Makefile for TestUnifiedLanComm

# Load PROJECT_DIR and PLATFORM from local configuration file
LOCAL_CONFIG_FILE=config.mk
ifneq ($(wildcard $(LOCAL_CONFIG_FILE)),)
include $(LOCAL_CONFIG_FILE)
CONFIGURE=
else
CONFIGURE=configure
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

ifeq ($(GMOCK_DIR),)
$(error "Please provide GMOCK_DIR environment variable.")
endif

ROMFSINST = $(shell if [ -x ../helper_scripts/romfs-inst.sh ]; then echo ../helper_scripts/romfs-inst.sh; else echo /usr/bin/romfs-inst.sh; fi)

TARGET = TestUnifiedLanComm

#LIBELVUTILSPATH = ../base/libs/elvutils
LIBELVUTILSPATH = $(ELVUTILS_DIR)
LIBELVUTILS = elvutils

#LIBHSSCOMMPATH = ../libs/libhsscomm
#LIBHSSCOMMPATH = $(LIBHSSCOMM_DIR)
#LIBHSSCOMM = hsscomm

#LIBXMLPARSERPATH = ../libs/xmlparser
#LIBXMLPARSERPATH = $(XMLPARSER_DIR)
#LIBXMLPARSER = xmlparser

#XMLRPCPATH = ../base/libs/xmlrpc
#XMLRPCPATH = $(XMLRPC_DIR)
#XMLRPCLIB = libXmlRpc.so
#XMLRPCINCLUDE = $(XMLRPCPATH)/src

LIBLANDEVICEUTILS_PATH = $(LIBLANDEVICEUTILS_DIR)
LIBLANDEVICEUTILS = LanDeviceUtils
LIBLANDEVICEUTILS_INCLUDE = $(LIBLANDEVICEUTILS_PATH)/include

ifeq "$(DEBUG)" "1"
OPTIMIZE = -g -O0
else
OPTIMIZE = -O2
endif

TARGETOBJS = \
	src/TestSuiteUnifiedLanComm.o


CC = $(CROSS)g++
CXX = $(CROSS)g++
ifeq "$(DEBUG)" "1"
STRIP = true
else
STRIP = $(CROSS)strip
endif

CXX_FLAGS += $(OPTIMIZE) -I../src -I../include -I./src -I$(LIBELVUTILSPATH) -I$(LIBLANDEVICEUTILS_INCLUDE) -I$(GMOCK_DIR)/include -I$(GMOCK_DIR)/gtest/include -fPIC $(MACHINE_OPTION) -Wall
LD_FLAGS += $(MACHINE_OPTION) -fPIC -L$(GMOCK_DIR) -lgmock -lpthread -L$(LIBLANDEVICEUTILS_PATH) -l$(LIBLANDEVICEUTILS) -L$(LIBELVUTILSPATH) -l$(LIBELVUTILS) -L../ -lUnifiedLanComm

all: $(CONFIGURE) info liblandeviceutils $(TARGET) 

configure:
	rm -f $(LOCAL_CONFIG_FILE)
	touch $(LOCAL_CONFIG_FILE)
	echo "PROJECT_DIR=$(PROJECT_DIR)" >> $(LOCAL_CONFIG_FILE)
	echo "PLATFORM=$(PLATFORM)" >> $(LOCAL_CONFIG_FILE)

liblandeviceutils_clean:
	make CROSS=$(CROSS) -C $(LIBLANDEVICEUTILS_PATH) clean

liblandeviceutils:
	make CROSS=$(CROSS) -C $(LIBLANDEVICEUTILS_PATH) lib$(LIBLANDEVICEUTILS).so

liblandeviceutils_install:
	make CROSS=$(CROSS) -C $(LIBLANDEVICEUTILS_PATH) install

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

$(TARGET): remove $(TARGETOBJS) $(TESTS)
	$(CXX) -o $(TARGET) $(TARGETOBJS) $(LD_FLAGS)

remove:
	rm -f $(TARGET)
	rm -f $(TARGETOBJS)

%.o: %.cpp
	$(CXX) $(CXX_FLAGS) -c -o $@ $<

install: $(TARGET)
	$(STRIP) $(TARGET)
	$(ROMFSINST) /bin/$(TARGET)


clean: liblandeviceutils_clean
	rm -rf src/*.o
	rm -rf $(TARGET)

